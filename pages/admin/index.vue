<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

const { data } = await useFetch("/api/admin/signups");

const relativeTime = (t) => {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "short" });
  const deltaSeconds = Math.round((new Date(t) - Date.now()) / 1000);

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

const updateToDo = async (id, to_do) => {
  await useFetch(`/api/admin/updatetodo`, {
    method: "post",
    body: {
      id,
      to_do,
    },
    async onResponse({ request, response, options }) {
      if (response.ok) {
        const signupIndex = data.value.findIndex((signup) => signup.id == id);
        data.value[signupIndex].to_do = to_do;
      }
    },
  });
};

</script>

<template>
  <v-container>
    <v-row justify="center" class="my-5 text-center">
      <h1>The Fever bandeoke admin interface</h1>
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
            v-for="signup in data.filter((signup) => signup.to_do)"
            :key="signup.created_at"
          >
            <td>{{ signup.name }}</td>
            <td>{{ relativeTime(signup.created_at) }}</td>
            <td>{{ signup.song.title }}</td>
            <td>{{ signup.song.artist }}</td>
            <td>
              <v-btn color="blue" @click="updateToDo(signup.id, false)"
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
            v-for="signup in data.filter((signup) => !signup.to_do)"
            :key="signup.created_at"
          >
            <td>{{ signup.name }}</td>
            <td>{{ relativeTime(signup.created_at) }}</td>
            <td>{{ signup.song.title }}</td>
            <td>{{ signup.song.artist }}</td>
            <td>
              <v-btn color="blue" @click="updateToDo(signup.id, true)"
                >Un-Dismiss</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-row>
  </v-container>
</template>
