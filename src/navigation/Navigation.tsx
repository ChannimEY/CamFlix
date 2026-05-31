import { createStaticNavigation } from "@react-navigation/native";
import { RootStack } from "./stacks/RootStack";

export const Navigation = createStaticNavigation(RootStack);