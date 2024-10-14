import { Image, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const Signing = () => {
  return (
    <Animatable.View
      animation={"fadeInUp"}
      duration={2000}
      className={"flex-1 items-center pt-32"}
    >
      <Image
        source={require("@/assets/images/iub-logo-2.png")}
        className="w-1/2 h-1/2"
      />
      <TouchableOpacity
        className={
          "w-60 h-14 bg-blue-950 border rounded-3xl border-blue-950 flex items-center justify-center"
        }
      >
        <Text className={"text-white text-3xl"}>Sign In</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Signing;
