
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PURPLE = "#7556D8";
const BACKGROUND = "#FAF9FF";
const DARK = "#211D35";
const MUTED = "#9691A8";

const today = new Date();
today.setHours(0, 0, 0, 0);

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

const sampleTasks = [
  {
    id: "1",
    title: "Complete project design",
    time: "09:00 AM",
    category: "Work",
    priority: "High",
    color: "#7556D8",
    date: dateKey(today),
  },
  {
    id: "2",
    title: "Read 20 pages",
    time: "12:30 PM",
    category: "Personal",
    priority: "Medium",
    color: "#E4A23A",
    date: dateKey(today),
  },
  {
    id: "3",
    title: "Team meeting",
    time: "03:00 PM",
    category: "Work",
    priority: "High",
    color: "#7556D8",
    date: dateKey(addDays(today, 1)),
  },
  {
    id: "4",
    title: "Gym session",
    time: "07:00 AM",
    category: "Personal",
    priority: "Low",
    color: "#35A477",
    date: dateKey(addDays(today, 2)),
  },
  {
    id: "5",
    title: "Study React Native",
    time: "05:00 PM",
    category: "Study",
    priority: "Medium",
    color: "#E4A23A",
    date: dateKey(addDays(today, 4)),
  },
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const startingDay = firstDay.getDay();

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - startingDay + 1;

    return new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      dayNumber
    );
  });

  const selectedTasks = sampleTasks.filter(
    (task) => task.date === dateKey(selectedDate)
  );

  function changeMonth(direction: number) {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1
    );

    setCurrentMonth(newMonth);
    setSelectedDate(newMonth);
  }

  function goToToday() {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  }

  const selectedDateLabel = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: BACKGROUND }}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="arrow-back" size={21} color={DARK} />
            </Pressable>

            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: DARK,
                }}
              >
                Calendar
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: MUTED,
                  marginTop: 3,
                }}
              >
                Plan your days with ease
              </Text>
            </View>
          </View>

          <Pressable
            onPress={goToToday}
            style={{
              backgroundColor: "#EEE9FC",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: PURPLE,
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              Today
            </Text>
          </Pressable>
        </View>

        {/* CALENDAR CARD */}

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 22,
            padding: 17,
            borderWidth: 1,
            borderColor: "#F0EDFA",
          }}
        >
          {/* MONTH NAVIGATION */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 23,
            }}
          >
            <Pressable
              onPress={() => changeMonth(-1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                backgroundColor: BACKGROUND,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-back" size={19} color={DARK} />
            </Pressable>

            <Text
              style={{
                fontSize: 17,
                fontWeight: "800",
                color: DARK,
              }}
            >
              {monthName}
            </Text>

            <Pressable
              onPress={() => changeMonth(1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                backgroundColor: BACKGROUND,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-forward" size={19} color={DARK} />
            </Pressable>
          </View>

          {/* WEEKDAYS */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <View
                  key={day}
                  style={{ width: "14.28%", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: MUTED,
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    {day}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* CALENDAR DATES */}

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {calendarDays.map((date, index) => {
              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth();

              const isSelected =
                dateKey(date) === dateKey(selectedDate);

              const isToday = dateKey(date) === dateKey(today);

              const hasTasks = sampleTasks.some(
                (task) => task.date === dateKey(date)
              );

              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelectedDate(date);

                    if (!isCurrentMonth) {
                      setCurrentMonth(
                        new Date(date.getFullYear(), date.getMonth(), 1)
                      );
                    }
                  }}
                  style={{
                    width: "14.28%",
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      backgroundColor: isSelected
                        ? PURPLE
                        : "transparent",
                      borderWidth: isToday && !isSelected ? 1 : 0,
                      borderColor: PURPLE,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight:
                          isSelected || isToday ? "800" : "500",
                        color: isSelected
                          ? "#FFFFFF"
                          : isCurrentMonth
                          ? DARK
                          : "#C9C5D2",
                      }}
                    >
                      {date.getDate()}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 3,
                      marginTop: 1,
                      backgroundColor: hasTasks
                        ? isSelected
                          ? "#FFFFFF"
                          : PURPLE
                        : "transparent",
                    }}
                  />
                </Pressable>
              );
            })}
          </View>

          {/* CALENDAR LEGEND */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              marginTop: 18,
              paddingTop: 15,
              borderTopWidth: 1,
              borderTopColor: "#F2EFF8",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: PURPLE,
                  marginRight: 7,
                }}
              />
              <Text style={{ color: MUTED, fontSize: 11 }}>Has tasks</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: PURPLE,
                  marginRight: 7,
                }}
              />
              <Text style={{ color: MUTED, fontSize: 11 }}>Today</Text>
            </View>
          </View>
        </View>

        {/* SELECTED DATE AND TASKS */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 28,
            marginBottom: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: DARK,
              }}
            >
              Scheduled Tasks
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: MUTED,
                marginTop: 4,
              }}
            >
              {selectedDateLabel}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#EEE9FC",
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: PURPLE,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {selectedTasks.length} Tasks
            </Text>
          </View>
        </View>

        {/* TASK LIST */}

        {selectedTasks.length > 0 ? (
          selectedTasks.map((task) => (
            <View
              key={task.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#F0EDFA",
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 45,
                  borderRadius: 5,
                  backgroundColor: task.color,
                  marginRight: 13,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: DARK,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  {task.title}
                </Text>

                <Text
                  style={{
                    color: MUTED,
                    fontSize: 11,
                    marginTop: 6,
                  }}
                >
                  {task.category} · {task.priority} Priority
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color={PURPLE}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: MUTED,
                    marginTop: 5,
                  }}
                >
                  {task.time}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 18,
              padding: 25,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#F0EDFA",
            }}
          >
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 18,
                backgroundColor: "#F1EDFC",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={26}
                color={PURPLE}
              />
            </View>

            <Text
              style={{
                color: DARK,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              No tasks scheduled
            </Text>

            <Text
              style={{
                color: MUTED,
                fontSize: 12,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Your day is looking clear. Add a task to get started.
            </Text>
          </View>
        )}

        {/* ADD TASK BUTTON */}

        <Pressable
          onPress={() => router.push("/add-task")}
          style={{
            backgroundColor: PURPLE,
            height: 55,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Ionicons name="add-circle-outline" size={21} color="#FFFFFF" />

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "700",
              marginLeft: 9,
            }}
          >
            Add New Task
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
