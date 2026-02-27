interface AuthUserType {
  fullName?: string;
  email: string;
  password: string;
  profilePic?: string;
}

interface MessageDataType {
  senderId: string;
  receiverId: string;
  text: string;
  image?: string;
  seen: boolean;
}
interface MessageType {
  Messages: MessageDataType[];
}

interface getFunction {
  void: () => object;
}

interface ThemeType {
  theme: string;
  setTheme: () => object;
}
