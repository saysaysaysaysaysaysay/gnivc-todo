import { todoStore } from "@/entities";
import { createContext, useContext } from "react";

const storeContext = createContext(todoStore)

export function useStore() {
  const store = useContext(storeContext)

  if (!store) {
    console.log("Error in store")
  }

  return store
}

export default storeContext