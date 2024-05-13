import { Redirect } from "expo-router";
import { FunctionComponent } from "react";

interface IndexProps {}

const Index: FunctionComponent<IndexProps> = () => {
  return <Redirect href="/(app)/home/" />;
};

export default Index;
