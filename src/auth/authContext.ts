import * as React from 'react';
import { AuthInterface } from 'auth';

const context = React.createContext<AuthInterface | null>(null);

export const AuthContextProvider = context.Provider;

export const AuthContextConsumer = context.Consumer;

