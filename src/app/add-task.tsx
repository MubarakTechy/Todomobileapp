
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AddTaskScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAF9FF",
      }}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 15,
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}

        {/* HEADER */}

<View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  }}
>
  <Pressable
    onPress={() => router.back()}
    style={{
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      borderWidth: 1,
      borderColor: "#F0EDFA",
    }}
  >
    <Ionicons
      name="arrow-back"
      size={21}
      color="#302B43"
    />
  </Pressable>

  <View
    style={{
      width: 43,
      height: 43,
      borderRadius: 14,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Ionicons name="add" size={25} color="#7556D8" />
  </View>

  <View style={{ marginLeft: 13, flex: 1 }}>
    <Text
      style={{
        fontSize: 24,
        fontWeight: "800",
        color: "#211D35",
      }}
    >
      Create New Task
    </Text>

    <Text
      style={{
        fontSize: 12,
        color: "#9691A8",
        marginTop: 4,
      }}
    >
      Organize your day, one task at a time.
    </Text>
  </View>
</View>
        {/* TASK TITLE */}

        <Text style={styles.label}>Task Title</Text>

        <TextInput
          placeholder="What do you need to do?"
          placeholderTextColor="#AAA5B8"
          style={styles.input}
        />

        {/* DESCRIPTION */}

        <Text style={styles.label}>Description</Text>

        <TextInput
          placeholder="Add more details about your task..."
          placeholderTextColor="#AAA5B8"
          multiline
          textAlignVertical="top"
          style={{
            ...styles.input,
            height: 110,
            paddingTop: 16,
          }}
        />

        {/* DATE AND TIME */}

        <Text style={styles.label}>Schedule</Text>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.fieldCard}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#7556D8"
              />

              <View style={{ marginLeft: 10 }}>
                <Text style={styles.fieldTitle}>Due Date</Text>
                <Text style={styles.fieldValue}>Select date</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.fieldCard}>
              <Ionicons
                name="time-outline"
                size={20}
                color="#7556D8"
              />

              <View style={{ marginLeft: 10 }}>
                <Text style={styles.fieldTitle}>Time</Text>
                <Text style={styles.fieldValue}>Select time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CATEGORY */}

        <Text style={styles.label}>Category</Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {[
            { name: "Work", icon: "briefcase-outline" },
            { name: "Personal", icon: "person-outline" },
            { name: "Study", icon: "book-outline" },
            { name: "Other", icon: "grid-outline" },
          ].map((item) => (
            <View
              key={item.name}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#EAE5F6",
                paddingHorizontal: 15,
                paddingVertical: 12,
                borderRadius: 13,
                gap: 7,
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={17}
                color="#7556D8"
              />

              <Text
                style={{
                  fontSize: 13,
                  color: "#514B65",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>

        {/* PRIORITY */}

        <Text style={styles.label}>Priority Level</Text>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          {[
            { name: "Low", color: "#399A69", bg: "#EAF7EF" },
            { name: "Medium", color: "#D69B37", bg: "#FFF5E4" },
            { name: "High", color: "#DF6262", bg: "#FFF0F0" },
          ].map((item) => (
            <View
              key={item.name}
              style={{
                flex: 1,
                backgroundColor: item.bg,
                paddingVertical: 15,
                borderRadius: 13,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: item.color,
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>

        {/* REMINDER */}

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            padding: 17,
            marginTop: 27,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#7556D8"
            />

            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#302B43",
                }}
              >
                Set Reminder
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  color: "#9691A8",
                  marginTop: 4,
                }}
              >
                Get notified about this task
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 42,
              height: 24,
              backgroundColor: "#EAE5F6",
              borderRadius: 20,
              justifyContent: "center",
              padding: 3,
            }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
              }}
            />
          </View>
        </View>

        {/* SAVE BUTTON */}

        <Pressable
          style={{
            backgroundColor: "#7556D8",
            height: 56,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={21}
            color="#FFFFFF"
          />

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: "700",
              marginLeft: 9,
            }}
          >
            Save Task
          </Text>
        </Pressable>

        <Text
          style={{
            textAlign: "center",
            color: "#AAA5B8",
            fontSize: 11,
            marginTop: 15,
          }}
        >
          You can edit your task details later.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  label: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#302B43",
    marginBottom: 11,
    marginTop: 22,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0EDFA",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    fontSize: 13,
    color: "#302B43",
  },

  fieldCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0EDFA",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  fieldTitle: {
    color: "#9691A8",
    fontSize: 10,
  },

  fieldValue: {
    color: "#302B43",
    fontSize: 12,
    fontWeight: "600" as const,
    marginTop: 5,
  },
};
