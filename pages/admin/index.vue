<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { data } = await useFetch("/api/admin/signups");
const { data: signupOpen, refresh: refreshSignupOpen } = await useFetch(
  "/api/signup/isopen"
);

const dummySwitchVariable = ref(signupOpen.value);

const relativeTime = (t) => {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "short" });
  const deltaSeconds = Math.round((t - Date.now()) / 1000);

  const cutoffs = [
    60,
    60 * 60,
    60 * 60 * 24,
    60 * 60 * 24 * 7,
    60 * 60 * 24 * 30,
    60 * 60 * 24 * 365,
    Infinity,
  ];

  const units = ["second", "minute", "hour", "day", "week", "month", "year"];
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};

const dismiss = async (timestamp) => {
  await useFetch(`/api/admin/dismiss/${timestamp}`, {
    method: "post",
    async onResponse({ request, response, options }) {
      if (response.ok) {
        const signupIndex = data.value.findIndex(
          (signup) => signup.timestamp == timestamp
        );
        data.value[signupIndex].toDo = false;
      }
    },
  });
};

const undismiss = async (timestamp) => {
  await useFetch(`/api/admin/undismiss/${timestamp}`, {
    method: "post",
    async onResponse({ request, response, options }) {
      if (response.ok) {
        const signupIndex = data.value.findIndex(
          (signup) => signup.timestamp == timestamp
        );
        data.value[signupIndex].toDo = true;
      }
    },
  });
};

const toggleSignupIsOpen = async () => {
  await useFetch(`/api/admin/updateisopen`, {
    method: "post",
    body: {
      status: signupOpen.value,
    },
    async onResponse({ request, response, options }) {
      await refreshSignupOpen();
    },
  });
};
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center" class="mb-5 text-center">
        <h1>The Fever bandeoke admin interface</h1>
      </v-row>
      <v-row justify="center" class="my-5">
        <v-col cols="auto">
          <v-switch
            v-model="signupOpen"
            @update:model-value="toggleSignupIsOpen"
            label="Signup open"
          />
        </v-col>
      </v-row>
      <v-row justify="center" class="my-5">
        <h2>To Do</h2>
      </v-row>
      <v-row justify="center">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Title</th>
              <th class="text-left">Artist</th>
              <th class="text-left">Dismiss</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="signup in data.filter((signup) => signup.toDo)"
              :key="signup.timestamp"
            >
              <td>{{ signup.name }}</td>
              <td>{{ relativeTime(signup.timestamp) }}</td>
              <td>{{ signup.song.title }}</td>
              <td>{{ signup.song.artist }}</td>
              <td>
                <v-btn color="blue" @click="dismiss(signup.timestamp)"
                  >Dismiss</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-row>
      <v-row justify="center" class="my-5">
        <h2>Done</h2>
      </v-row>
      <v-row justify="center">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Title</th>
              <th class="text-left">Artist</th>
              <th class="text-left">Un-Dismiss</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="signup in data.filter((signup) => !signup.toDo)"
              :key="signup.timestamp"
            >
              <td>{{ signup.name }}</td>
              <td>{{ relativeTime(signup.timestamp) }}</td>
              <td>{{ signup.song.title }}</td>
              <td>{{ signup.song.artist }}</td>
              <td>
                <v-btn color="blue" @click="undismiss(signup.timestamp)"
                  >Un-Dismiss</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-row>
    </v-container>
  </div>
</template>
