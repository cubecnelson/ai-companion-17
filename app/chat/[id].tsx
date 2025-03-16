import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, MoveVertical as MoreVertical, Sparkles, Clock, CheckCheck, Heart } from 'lucide-react-native';

type Message = {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'ai';
  read: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
};

const companions = {
  '1': {
    name: 'Luna',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    loveLevel: 4,
  },
  '2': {
    name: 'Atlas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    loveLevel: 3,
  },
};

const predefinedPrompts = [
  "Tell me about yourself",
  "What are your thoughts on...",
  "Can you help me with...",
  "Let's talk about...",
];

const LoveMeter = ({ level }: { level: number }) => (
  <View style={styles.loveMeterContainer}>
    {[...Array(5)].map((_, index) => (
      <Heart
        key={index}
        size={20}
        color={index < level ? '#FF6B6B' : '#eee'}
        fill={index < level ? '#FF6B6B' : 'none'}
      />
    ))}
  </View>
);

export default function ChatRoom() {
  const { id } = useLocalSearchParams();
  const companion = companions[id as keyof typeof companions];
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messagesRemaining, setMessagesRemaining] = useState(20);
  const [showPrompts, setShowPrompts] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Luna, your AI companion. How can I assist you today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      sender: 'ai',
      read: true,
    },
    {
      id: '2',
      text: "Hi Luna! I'm excited to chat with you.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      sender: 'user',
      read: true,
    },
    {
      id: '3',
      text: "That's wonderful! I'm here to help and engage in meaningful conversations. What would you like to discuss?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      sender: 'ai',
      read: true,
    },
  ]);

  useEffect(() => {
    // Simulate typing indicator
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || text.length > 100) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      sender: 'user',
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setMessagesRemaining(prev => prev - 1);
    setIsTyping(true);
    setShowPrompts(false);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand what you're saying. Let me think about that for a moment...",
        timestamp: new Date(),
        sender: 'ai',
        read: false,
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <View style={styles.companionInfo}>
            <Image 
              source={{ uri: companion.avatar }}
              style={styles.headerAvatar}
            />
            <View>
              <Text style={styles.headerTitle}>{companion.name}</Text>
              <LoveMeter level={companion.loveLevel} />
            </View>
          </View>
          {isTyping && (
            <Text style={styles.typingIndicator}>typing...</Text>
          )}
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.sender === 'user'
                  ? styles.userBubble
                  : styles.aiBubble,
              ]}
            >
              <Text style={[styles.messageText, msg.sender !== 'user' ? styles.aiMessageText: {}]}>{msg.text}</Text>
              <View style={styles.messageFooter}>
                <Text style={styles.timestamp}>
                  {formatTime(msg.timestamp)}
                </Text>
                {msg.sender === 'user' && (
                  <CheckCheck
                    size={16}
                    color={msg.read ? '#4CAF50' : '#9E9E9E'}
                  />
                )}
              </View>
            </View>
          </View>
        ))}
        {isTyping && (
          <View style={[styles.messageWrapper, styles.aiMessage]}>
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <View style={styles.typingBubble}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {showPrompts && (
        <ScrollView
          horizontal
          style={styles.promptsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {predefinedPrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.promptButton}
              onPress={() => {
                setMessage(prompt);
                setShowPrompts(false);
              }}
            >
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.inputContainer}>
        {messagesRemaining <= 5 && (
          <Text style={styles.messageLimit}>
            {messagesRemaining} messages remaining today
          </Text>
        )}
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.promptsButton}
            onPress={() => setShowPrompts(!showPrompts)}
          >
            <Sparkles size={24} color="#A490DC" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            maxLength={100}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || message.length > 100) && styles.sendButtonDisabled,
            ]}
            onPress={() => sendMessage(message)}
            disabled={!message.trim() || message.length > 100}
          >
            <Send size={24} color={message.trim() ? '#FFF' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  companionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },
  loveMeterContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  typingIndicator: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A490DC',
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiMessageText: {
    color: '#000',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#000',
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A490DC',
    opacity: 0.5,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  messageLimit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  promptsButton: {
    padding: 8,
    backgroundColor: 'rgba(164, 144, 220, 0.1)',
    borderRadius: 20,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#eee',
  },
  promptsContainer: {
    maxHeight: 60,
    marginBottom: 12,
  },
  promptButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  promptText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
});