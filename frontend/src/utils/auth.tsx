import React, { PropsWithChildren, ComponentType } from "react";
import { AppState, Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithHistory = ({
  children,
}: PropsWithChildren<any>): JSX.Element | null => {
  const navigate = useNavigate();

  const domain: string | undefined = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId: string | undefined = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience: string | undefined = process.env.REACT_APP_AUTH0_AUDIENCE;
  const redirectUri: string | undefined = process.env.REACT_APP_AUTH0_CALLBACK_URI;

  const onRedirectCallback = (appState: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && audience && redirectUri)) {
    return null;
  }

  const fullRedirect = [window.location.origin, redirectUri].join("/")

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={fullRedirect}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

interface ProtectedRouteProps {
  component: ComponentType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (<div>Redirecting</div>),
  });

  return <Component />;
};
