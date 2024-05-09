import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import FieldList, { item } from "@/components/ui/FieldList";
import { FC, ReactNode, useState } from "react";
import { IconButton, TextInput } from "react-native-paper";
import React from "react";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";
import { User } from "@/types";

export type userForm = {
  email: string;
  phone: string;
  dia_chi: string;
};
export const FieldText: FC<{
  title: string;
  children: ReactNode;
}> = ({ title, children }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 280,
      }}
    >
      <Text style={{ width: 60 }}>{title}</Text>
      {children}
    </View>
  );
};
const items: ({
  value,
  setValue,
}: {
  value: User;
  setValue: React.Dispatch<React.SetStateAction<userForm>>;
}) => (() => item)[] = ({ value, setValue }) => [
  () => {
    const [isDisable, setIsDisable] = useState<boolean>(true);
    return {
      itemKey: 1,
      left: (
        <FieldText title="Email">
          <TextInput
            style={{ flex: 1, height: 40 }}
            mode="outlined"
            disabled={isDisable}
            textContentType="emailAddress"
            value={value.email}
            onChangeText={(text) =>
              setValue((prev) => ({ ...prev, email: text }))
            }
          ></TextInput>
        </FieldText>
      ),
      right: (
        <IconButton
          icon="circle-edit-outline"
          iconColor={"black"}
          size={20}
          onPress={() => setIsDisable(!isDisable)}
        />
      ),
    };
  },
  () => {
    const [isDisable, setIsDisable] = useState<boolean>(true);
    return {
      itemKey: 2,
      left: (
        <FieldText title="Phone">
          <TextInput
            style={{ flex: 1, height: 40 }}
            mode="outlined"
            disabled={isDisable}
            value={value.phone ?? ""}
            textContentType="telephoneNumber"
            onChangeText={(text) =>
              setValue((prev) => ({ ...prev, phone: text }))
            }
          ></TextInput>
        </FieldText>
      ),
      right: (
        <IconButton
          icon="circle-edit-outline"
          iconColor={"black"}
          size={20}
          onPress={() => setIsDisable(!isDisable)}
        />
      ),
    };
  },
  // () => {
  //   const [isDisable, setIsDisable] = useState<boolean>(true);
  //   return {
  //     itemKey: 3,
  //     left: (
  //       <FieldText title="Địa Chỉ">
  //         <TextInput
  //           style={{ flex: 1, height: 40 }}
  //           mode="outlined"
  //           disabled={isDisable}
  //           value={value.dia_chi}
  //           onChangeText={(text) =>
  //             setValue((prev) => ({ ...prev, dia_chi: text }))
  //           }
  //         ></TextInput>
  //       </FieldText>
  //     ),
  //     right: (
  //       <IconButton
  //         icon="circle-edit-outline"
  //         iconColor={"black"}
  //         size={20}
  //         onPress={() => setIsDisable(!isDisable)}
  //       />
  //     ),
  //   };
  // },
];
export default function TabThreeScreen() {
  const [form, setForm] = useState<userForm>({
    email: "thangvu2325@gmail.com",
    phone: "0395177093",
    dia_chi: "240 gò xoài",
  });
  const { currentUser } = useAppSelector(useAuth);
  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <FieldList
          title={<Text>Thông Tin Liên Hệ</Text>}
          items={items({
            value: currentUser?.user as User,
            setValue: setForm,
          }).map((itemFn) => itemFn())}
        ></FieldList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: "100%" },
  container: {
    display: "flex",
  },
});
