<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>
    <!-- Menu -->
    <ul v-else class="menu bg-base-200">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.tasks.length">
          <details>
            <summary>
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <li>
            <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
          </li>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '@projects/store/projects.store';
const projectsStore = useProjectsStore();
</script>
