import { CurrentUserProvider } from "../../context/CurrentUser";
import { EventsProvider } from "../../context/Events";
import { UsersProvider } from "../../context/Users";

const AppContextProvider = ({ children }) => {
  return (
    <UsersProvider>
      <EventsProvider>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </EventsProvider>
    </UsersProvider>
  );
};

export default AppContextProvider;
