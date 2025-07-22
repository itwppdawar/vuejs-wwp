<template>
    <div>
      <div v-if="!isLoggedIn">
      <h2>Welcome, {{ currentUser }}</h2>
      <button @click="handleLogout">Logout</button>
      </div>
    </div>
</template>