import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keycloak } from "../keycloakConfig";
import {
  setAuthenticated,
  setLoading,
  setToken,
  setUserDetails,
} from "../features/auth/authSlice";

export const KeycloakProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateToken = (refresh = false) => {
      if (refresh) {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            dispatch(setToken(keycloak.token));
          }
        });
      }
    };

    keycloak.onTokenExpired = () => {
      updateToken(true);
    };

    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: "login-required" });
        if (authenticated) {
          dispatch(setAuthenticated(true));
          dispatch(setToken(keycloak.token));
          const userInfo = await keycloak.loadUserInfo();
          dispatch(setUserDetails(userInfo));
        } else {
          dispatch(setAuthenticated(false));
        }
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Keycloak initialization error", error);
      }
    };

    initKeycloak();
  }, [dispatch]);

  return <>{children}</>;
};
