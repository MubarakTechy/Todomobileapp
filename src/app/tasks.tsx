
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete UI Design",
    description: "Finish the TaskNest mobile app screens",
    category: "Design",
    time: "09:00 AM",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Mobile App Research",
    description: "Review competitor applications",
    category: "Work",
    time: "11:30 AM",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Read a Book",
    description: "Read at least 20 pages",
    category: "Personal",
    time: "02:00 PM",
    priority: "Low",
    completed: true,
  },
  {
    id: 4,
    title: "Client Meeting",
    description: "Discuss the new project requirements",
    category: "Work",
    time: "04:00 PM",
    priority: "High",
    completed: false,
  },
  {
    id: 5,
    title: "Exercise",
    description: "Complete today's workout",
    category: "Personal",
    time: "06:00 PM",
    priority: "Medium",
    completed: true,
  },
];

const filters = ["All", "Pending", "Completed"] as const;

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [search, setSearch] = useState("");

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Pending" && !task.completed) ||
      (activeFilter === "Completed" && task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.category.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const priorityColor = (priority: Task["priority"]) => {
    if (priority === "High") return "#E56B75";
    if (priority === "Medium") return "#E6A23C";
    return "#42A889";
  };

  const categoryIcon = (category: string) => {
    if (category === "Design") return "color-palette-outline";
    if (category === "Work") return "briefcase-outline";
    return "person-outline";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9FF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>STAY ORGANIZED</Text>
            <Text style={styles.heading}>My Tasks</Text>
            <Text style={styles.subtitle}>
              Keep track of everything you need to do.
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/add-task")}
          >
            <Ionicons name="add" size={25} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* PROGRESS CARD */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressLabel}>YOUR DAILY PROGRESS</Text>
              <Text style={styles.progressNumber}>{progress}%</Text>
              <Text style={styles.progressDescription}>
                {completedCount} of {tasks.length} tasks completed
              </Text>
            </View>

            <View style={styles.progressIcon}>
              <Ionicons name="trophy-outline" size={28} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressFooterText}>
              {completedCount} Completed
            </Text>
            <Text style={styles.progressFooterText}>
              {pendingCount} Remaining
            </Text>
          </View>
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#F0EBFF" }]}>
              <Ionicons name="list-outline" size={21} color="#7556D8" />
            </View>
            <Text style={styles.summaryNumber}>{tasks.length}</Text>
            <Text style={styles.summaryLabel}>Total Tasks</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#FFF2E6" }]}>
              <Ionicons name="time-outline" size={21} color="#E69A48" />
            </View>
            <Text style={styles.summaryNumber}>{pendingCount}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#E9F8F1" }]}>
              <Ionicons name="checkmark-circle-outline" size={21} color="#42A889" />
            </View>
            <Text style={styles.summaryNumber}>{completedCount}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9691A8" />
          <TextInput
            placeholder="Search your tasks..."
            placeholderTextColor="#A7A1B7"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={19} color="#9691A8" />
            </Pressable>
          )}
        </View>

        {/* FILTERS */}
        <View style={styles.filterRow}>
          {filters.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* TASK LIST */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeFilter === "All"
              ? "All Tasks"
              : `${activeFilter} Tasks`}
          </Text>
          <Text style={styles.taskCount}>
            {filteredTasks.length} tasks
          </Text>
        </View>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Pressable
              key={task.id}
              onPress={() => toggleTask(task.id)}
              style={[
                styles.taskCard,
                task.completed && styles.completedCard,
              ]}
            >
              <Pressable
                onPress={() => toggleTask(task.id)}
                style={[
                  styles.checkbox,
                  task.completed && styles.checkedBox,
                ]}
              >
                {task.completed && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </Pressable>

              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedTitle,
                  ]}
                >
                  {task.title}
                </Text>

                <Text style={styles.taskDescription}>
                  {task.description}
                </Text>

                <View style={styles.taskMeta}>
                  <View style={styles.categoryTag}>
                    <Ionicons
                      name={categoryIcon(task.category) as any}
                      size={12}
                      color="#7556D8"
                    />
                    <Text style={styles.categoryText}>
                      {task.category}
                    </Text>
                  </View>

                  <View style={styles.timeTag}>
                    <Ionicons
                      name="time-outline"
                      size={12}
                      color="#9691A8"
                    />
                    <Text style={styles.timeText}>{task.time}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.priorityContainer}>
                <View
                  style={[
                    styles.priorityDot,
                    { backgroundColor: priorityColor(task.priority) },
                  ]}
                />
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="file-tray-outline"
              size={42}
              color="#B7AECF"
            />
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptyDescription}>
              Try another filter or create a new task.
            </Text>
          </View>
        )}

        {/* BOTTOM BUTTON */}
        <Pressable
          style={styles.createButton}
          onPress={() => router.push("/add-task")}
        >
          <Ionicons name="add-circle-outline" size={21} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create New Task</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 23,
  },
  greeting: {
    color: "#7556D8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: 29,
    fontWeight: "800",
    color: "#211D35",
    marginTop: 5,
  },
  subtitle: {
    color: "#9691A8",
    fontSize: 12,
    marginTop: 5,
  },
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#7556D8",
    alignItems: "center",
    justifyContent: "center",
  },
  progressCard: {
    backgroundColor: "#7556D8",
    borderRadius: 22,
    padding: 19,
    marginBottom: 17,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 9,
    color: "#DED5FF",
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  progressNumber: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 5,
  },
  progressDescription: {
    color: "#E4DCFF",
    fontSize: 11,
    marginTop: 2,
  },
  progressIcon: {
    width: 53,
    height: 53,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginTop: 19,
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressFooterText: {
    fontSize: 10,
    color: "#E4DCFF",
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 12,
    minHeight: 116,
  },
  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  summaryNumber: {
    fontSize: 21,
    fontWeight: "800",
    color: "#211D35",
  },
  summaryLabel: {
    fontSize: 10,
    color: "#9691A8",
    marginTop: 3,
  },
  searchContainer: {
    height: 49,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 17,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#302B43",
  },
  filterRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 23,
  },
  filterButton: {
    paddingHorizontal: 19,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  activeFilter: {
    backgroundColor: "#7556D8",
  },
  filterText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9691A8",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#211D35",
  },
  taskCount: {
    fontSize: 11,
    color: "#9691A8",
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#F0EDFA",
  },
  completedCard: {
    backgroundColor: "#FCFBFF",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#C8BEDF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    marginTop: 2,
  },
  checkedBox: {
    backgroundColor: "#7556D8",
    borderColor: "#7556D8",
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#302B43",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#AAA5B8",
  },
  taskDescription: {
    fontSize: 10,
    color: "#9691A8",
    marginTop: 5,
    lineHeight: 15,
  },
  taskMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
  },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F2EEFF",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },
  categoryText: {
    color: "#7556D8",
    fontSize: 9,
    fontWeight: "600",
  },
  timeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    color: "#9691A8",
    fontSize: 9,
  },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 5,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
  },
  priorityText: {
    fontSize: 9,
    color: "#9691A8",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#302B43",
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 11,
    color: "#9691A8",
    marginTop: 5,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#7556D8",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 10,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
