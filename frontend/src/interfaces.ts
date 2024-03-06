export interface IDockerInfo {
    data: {
      dockerps: string
    }
  }

export interface IAccountsCsvData {
  email: string;
  emailAlias?: string;
  password: string;
  Imap: string;
  emailHash?: string;
  passwordHash?: string;
  vpnEnabled: boolean;
  status: 'working' | 'ready' | 'banned';
  loading: boolean;
  envPort: number;
  envAccountName: string;
}