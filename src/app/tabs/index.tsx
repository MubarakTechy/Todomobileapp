
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Task = {
  id: string;
  title: string;
  category: string;
  time: string;
  completed: boolean;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  dayOffset: number;
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Mobile App Research",
    category: "Development",
    time: "09:00 AM",
    completed: true,
    color: "#E9E3FF",
    icon: "document-text-outline",
    dayOffset: 0,
  },
  {
    id: "2",
    title: "Complete UI Design",
    category: "Design",
    time: "11:30 AM",
    completed: true,
    color: "#F0E9FF",
    icon: "color-palette-outline",
    dayOffset: 0,
  },
  {
    id: "3",
    title: "Client Meeting",
    category: "Work",
    time: "02:00 PM",
    completed: false,
    color: "#E8F0FF",
    icon: "people-outline",
    dayOffset: 0,
  },
  {
    id: "4",
    title: "Review project progress",
    category: "Work",
    time: "10:00 AM",
    completed: false,
    color: "#E8F0FF",
    icon: "briefcase-outline",
    dayOffset: 1,
  },
  {
    id: "5",
    title: "Read a book",
    category: "Personal",
    time: "08:00 PM",
    completed: false,
    color: "#E9F8F1",
    icon: "book-outline",
    dayOffset: 1,
  },
  {
    id: "6",
    title: "Plan the next project",
    category: "Work",
    time: "09:30 AM",
    completed: false,
    color: "#E8F0FF",
    icon: "clipboard-outline",
    dayOffset: 2,
  },
];

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function getDateLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
}

function getMonthYear(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getFullDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);

  const today = new Date();
  const selectedDate = addDays(today, selectedDay);
  const nextDate = addDays(selectedDate, 1);

  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(today, index)),
    []
  );

  const selectedTasks = tasks.filter(
    (task) => task.dayOffset === selectedDay
  );

  const upcomingTasks = tasks.filter(
    (task) => task.dayOffset === selectedDay + 1
  );

  const filteredSelectedTasks = selectedTasks.filter((task) => {
    const query = search.toLowerCase().trim();

    return (
      task.title.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query)
    );
  });

  const filteredUpcomingTasks = upcomingTasks.filter((task) => {
    const query = search.toLowerCase().trim();

    return (
      task.title.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query)
    );
  });

  const completedCount = selectedTasks.filter(
    (task) => task.completed
  ).length;

  const totalCount = selectedTasks.length;

  const progress =
    totalCount === 0
      ? 0
      : Math.round((completedCount / totalCount) * 100);

  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const openNotifications = () => {
    Alert.alert(
      "Notifications",
      "You're all caught up! Your task reminders will appear here.",
      [{ text: "Got it", style: "default" }]
    );
  };

  const openCalendar = () => {
    router.navigate("/calendar");
  };

  const openAllTasks = () => {
    router.navigate("/tasks");
  };

  const openAddTask = () => {
    router.push("/add-task");
  };

  const renderTask = (task: Task) => (
    <Pressable
      key={task.id}
      onPress={() => toggleTask(task.id)}
      style={({ pressed }) => [
        styles.taskCard,
        task.completed && styles.completedTaskCard,
        pressed && styles.pressedCard,
      ]}
    >
      <View
        style={[
          styles.taskIcon,
          { backgroundColor: task.color },
        ]}
      >
        <Ionicons
          name={task.icon}
          size={21}
          color="#7556D8"
        />
      </View>

      <View style={styles.taskInfo}>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.completedTaskTitle,
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        <Text style={styles.taskMeta}>
          {task.category} <Text style={styles.metaDot}>·</Text> {task.time}
        </Text>
      </View>

      <View
        style={[
          styles.checkbox,
          task.completed && styles.checkedCheckbox,
        ]}
      >
        {task.completed && (
          <Ionicons
            name="checkmark"
            size={15}
            color="#FFFFFF"
          />
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FAF9FF"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.welcome}>WELCOME BACK 👋</Text>

            <Text style={styles.heading}>Hi, Alex!</Text>

            <Text style={styles.subtitle}>
              You have {selectedTasks.filter((task) => !task.completed).length} tasks
              remaining for this day.
            </Text>
          </View>

          <Pressable
            onPress={openNotifications}
            style={({ pressed }) => [
              styles.notificationButton,
              pressed && styles.pressedCard,
            ]}
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color="#7556D8"
            />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#A7A1B7"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search your tasks..."
            placeholderTextColor="#AAA5B8"
            style={styles.searchInput}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color="#A7A1B7"
              />
            </Pressable>
          )}
        </View>

        {/* DATE HEADER */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {getMonthYear(selectedDate)}
            </Text>
            <Text style={styles.dateSubtitle}>
              {getFullDate(selectedDate)}
            </Text>
          </View>

          <Pressable
            onPress={openCalendar}
            style={styles.calendarButton}
          >
            <Ionicons
              name="calendar-outline"
              size={21}
              color="#7556D8"
            />
          </Pressable>
        </View>

        {/* DATE SELECTOR */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
        >
          {weekDates.map((date, index) => {
            const isActive = selectedDay === index;

            return (
              <Pressable
                key={date.toISOString()}
                onPress={() => setSelectedDay(index)}
                style={[
                  styles.dateCard,
                  isActive && styles.activeDateCard,
                ]}
              >
                <Text
                  style={[
                    styles.dateDay,
                    isActive && styles.activeDateText,
                  ]}
                >
                  {getDateLabel(date)}
                </Text>

                <Text
                  style={[
                    styles.dateNumber,
                    isActive && styles.activeDateText,
                  ]}
                >
                  {date.getDate()}
                </Text>

                {index === 0 && (
                  <View
                    style={[
                      styles.todayDot,
                      isActive && styles.activeTodayDot,
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* PROGRESS CARD */}

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressLabel}>
                DAILY PROGRESS
              </Text>
              <Text style={styles.progressHeading}>
                You're doing great!
              </Text>
            </View>

            <View style={styles.progressIcon}>
              <Ionicons
                name="trending-up-outline"
                size={23}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.progressNumbers}>
            <Text style={styles.progressPercentage}>
              {progress}%
            </Text>

            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>
                {completedCount}/{totalCount} Completed
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressMessage}>
              {totalCount === 0
                ? "No tasks scheduled for this day."
                : progress === 100
                  ? "Amazing! All tasks completed. 🎉"
                  : "Keep going. Every task counts!"}
            </Text>

            <Ionicons
              name="sparkles-outline"
              size={17}
              color="#EAE3FF"
            />
          </View>
        </View>

        {/* TODAY'S TASKS */}

        <View style={styles.taskSectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {selectedDay === 0
                ? "Today's Tasks"
                : "Selected Day's Tasks"}
            </Text>

            <Text style={styles.dateSubtitle}>
              {selectedDay === 0
                ? "Your schedule for today"
                : getFullDate(selectedDate)}
            </Text>
          </View>

          <Pressable
            onPress={openAllTasks}
            hitSlop={10}
          >
            <Text style={styles.seeAll}>See All <Ionicons name="arrow-forward" size={12} /></Text>
          </Pressable>
        </View>

        {filteredSelectedTasks.length > 0 ? (
          filteredSelectedTasks.map(renderTask)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="file-tray-outline"
              size={34}
              color="#B7AECF"
            />
            <Text style={styles.emptyTitle}>
              {search ? "No matching tasks" : "Nothing planned yet"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {search
                ? "Try searching with another keyword."
                : "Enjoy the free time or add a new task."}
            </Text>
          </View>
        )}

        {/* UPCOMING TASKS */}

        <View style={styles.taskSectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Upcoming Tasks
            </Text>

            <Text style={styles.dateSubtitle}>
              {getFullDate(nextDate)}
            </Text>
          </View>

          <Pressable
            onPress={openAllTasks}
            hitSlop={10}
          >
            <Text style={styles.seeAll}>See All <Ionicons name="arrow-forward" size={12} /></Text>
          </Pressable>
        </View>

        {filteredUpcomingTasks.length > 0 ? (
          filteredUpcomingTasks.map(renderTask)
        ) : (
          <View style={styles.emptyStateSmall}>
            <Ionicons
              name="calendar-clear-outline"
              size={27}
              color="#B7AECF"
            />
            <Text style={styles.emptySubtitle}>
              {search
                ? "No matching upcoming tasks."
                : "No tasks planned for this day yet."}
            </Text>
          </View>
        )}

        {/* ADD TASK BUTTON */}

        <Pressable
          onPress={openAddTask}
          style={({ pressed }) => [
            styles.addTaskButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Ionicons
            name="add-circle-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.addTaskText}>
            Add New Task
          </Text>
        </Pressable>

        <Text style={styles.bottomMessage}>
          Stay focused. One task at a time. ✨
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FF",
  },

  scrollContent: {
    paddingHorizontal: 21,
    paddingTop: 12,
    paddingBottom: 28,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerText: {
    flex: 1,
  },

  welcome: {
    fontSize: 10,
    color: "#7556D8",
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 5,
  },

  heading: {
    fontSize: 29,
    fontWeight: "800",
    color: "#211D35",
  },

  subtitle: {
    fontSize: 11,
    color: "#9691A8",
    marginTop: 6,
  },

  notificationButton: {
    width: 47,
    height: 47,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0EDFA",
    marginLeft: 12,
  },

  notificationDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#FF7373",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  searchContainer: {
    height: 51,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#F0EDFA",
  },

  searchInput: {
    flex: 1,
    marginLeft: 11,
    fontSize: 13,
    color: "#211D35",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#211D35",
  },

  dateSubtitle: {
    fontSize: 11,
    color: "#9691A8",
    marginTop: 5,
  },

  calendarButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F0EBFF",
    alignItems: "center",
    justifyContent: "center",
  },

  dateList: {
    gap: 10,
    paddingBottom: 23,
  },

  dateCard: {
    width: 48,
    height: 69,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0EDFA",
  },

  activeDateCard: {
    backgroundColor: "#7556D8",
    borderColor: "#7556D8",
  },

  dateDay: {
    fontSize: 10,
    color: "#A09BAD",
    fontWeight: "500",
  },

  dateNumber: {
    fontSize: 17,
    fontWeight: "800",
    color: "#302B43",
    marginTop: 5,
  },

  activeDateText: {
    color: "#FFFFFF",
  },

  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#7556D8",
    position: "absolute",
    bottom: 5,
  },

  activeTodayDot: {
    backgroundColor: "#FFFFFF",
  },

  progressCard: {
    backgroundColor: "#7556D8",
    padding: 19,
    borderRadius: 22,
    marginBottom: 29,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressLabel: {
    color: "#DED5FF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  progressHeading: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },

  progressIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.17)",
    justifyContent: "center",
    alignItems: "center",
  },

  progressNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },

  progressPercentage: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
  },

  progressBadge: {
    backgroundColor: "#9279E6",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },

  progressBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  progressTrack: {
    height: 8,
    backgroundColor: "#A995ED",
    borderRadius: 10,
    marginTop: 13,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  progressFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },

  progressMessage: {
    color: "#EAE3FF",
    fontSize: 10,
  },

  taskSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 2,
  },

  seeAll: {
    color: "#7556D8",
    fontSize: 12,
    fontWeight: "700",
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 17,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0EDFA",
  },

  completedTaskCard: {
    backgroundColor: "#FDFDFF",
  },

  pressedCard: {
    opacity: 0.75,
  },

  taskIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  taskInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 9,
  },

  taskTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#302B43",
  },

  completedTaskTitle: {
    color: "#A09BAD",
    textDecorationLine: "line-through",
  },

  taskMeta: {
    fontSize: 10,
    color: "#A09BAD",
    marginTop: 5,
  },

  metaDot: {
    color: "#7556D8",
  },

  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#C7C1D5",
    justifyContent: "center",
    alignItems: "center",
  },

  checkedCheckbox: {
    backgroundColor: "#8BCB94",
    borderColor: "#8BCB94",
  },

  emptyState: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 17,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F0EDFA",
  },

  emptyStateSmall: {
    backgroundColor: "#FFFFFF",
    padding: 19,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  emptyTitle: {
    color: "#302B43",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },

  emptySubtitle: {
    color: "#9691A8",
    fontSize: 11,
    marginTop: 6,
    textAlign: "center",
  },

  addTaskButton: {
    backgroundColor: "#7556D8",
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 18,
    gap: 9,
  },

  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  addTaskText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  bottomMessage: {
    textAlign: "center",
    color: "#AAA5B8",
    fontSize: 10,
    marginTop: 20,
  },
});
