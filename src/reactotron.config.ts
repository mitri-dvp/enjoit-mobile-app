import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reactotronZustand from "reactotron-plugin-zustand";

import { useRootStore } from "src/store/root";
import { useUserStore } from "src/store/user";

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: "Enjoit",
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(
    reactotronZustand({
      stores: [
        {
          name: "root",
          store: useRootStore,
        },
        {
          name: "user",
          store: useUserStore,
        },
      ],
    })
  )
  .connect(); // let's connect!
