import * as React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { db } from "../db/state";
import { useValue } from "../lib/db/react";
import {
  baseMessages,
  loadMessages,
  resolveLocale,
  type LocaleMessages,
} from "./locales";

const defaultMessages: LocaleMessages = baseMessages;

const IntlProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const locale = useValue(db, "locale");
  const [messages, setMessages] =
    React.useState<LocaleMessages>(defaultMessages);

  React.useEffect(() => {
    let cancelled = false;
    void loadMessages(locale).then((nextMessages) => {
      if (!cancelled) {
        setMessages({ ...baseMessages, ...nextMessages });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <ReactIntlProvider
      locale={resolveLocale(locale)}
      defaultLocale="en"
      messages={messages}
    >
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
