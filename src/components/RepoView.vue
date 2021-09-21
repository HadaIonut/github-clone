<template>
  <os-container class="pt-5 container">
    <div class="list-container">
      <h4 class="repo-title">{{ reponame }}</h4>
      <OsBreadcrumb>
        <div class="breadcrumb-item active" @click="goToLocation('')">
          <!-- TODO: move to custom event -->
          <div><i class="bi bi-house-fill"></i> Home</div>
        </div>
        <div
          v-for="(path, index) in paths"
          :key="index"
          @click="goToLocation(paths[index + 1])"
          class="breadcrumb-item active"
        >
          {{ path }}
        </div>
      </OsBreadcrumb>
      <LanguagesBar v-bind:username="username" v-bind:reponame="reponame" />

      <os-container-fluid class="p-0">
        <OsListGroupItem
          class="font-weight-bold bg-secondary text-white d-flex rounded-top"
        >
          {{ commitsInfo }} commits have been made in this repository.
          {{ nrOfBranches }} active
          <span v-if="nrOfBranches == 1">&nbsp;branch </span>
          <span v-if="nrOfBranches > 1">&nbsp;branches</span>.
        </OsListGroupItem>
        <OsListGroupItem
          class="clickable d-flex font-weight-bold"
          @click="goToParentDirectory"
          v-if="this.currentLocationString !== ''"
        >
          ..
        </OsListGroupItem>
        <OsListGroup class="list">
          <div v-for="doc in docs" :key="doc.sha" v-on:click="handleClick(doc)">
            <OsListGroupItem class="list-item-container clickable">
              <div v-if="doc.type === 'dir'" class="list-item">
                <i class="bi bi-folder-fill list-icon"> </i>
                <div class="list-item-doc-title">{{ doc.name }}</div>
              </div>
              <div v-if="doc.type === 'file'" class="list-item">
                <i class="bi bi-file-code list-icon"> </i>
                <div class="list-item-doc-title">{{ doc.name }}</div>
              </div>
            </OsListGroupItem>
          </div>
        </OsListGroup>
      </os-container-fluid>
    </div>
    <!-- <Modal /> -->
  </os-container>
</template>

<script>
import LanguagesBar from './repos/LanguagesBar.vue';
//import OsBreadcrumbItem from './generics/OsBreadcrumbItem.vue';
import OsBreadcrumb from '../components/generics/OsBreadcrumb.vue';
import OsContainer from './generics/Layout/OsContainer.vue';
import OsContainerFluid from './generics/Layout/OsContainerFluid.vue';
import { computed, onMounted, ref } from 'vue';
import OsListGroup from '../components/generics/OsListGroup.vue';
import OsListGroupItem from '../components/generics/OsListGroupItem.vue';
import { useStore } from 'vuex';
export default {
  components: {
    LanguagesBar,
    OsBreadcrumb,
    //OsBreadcrumbItem,
    OsContainer,
    OsContainerFluid,
    OsListGroup,
    OsListGroupItem,
  },
  name: 'RepoView',
  props: {
    reponame: String,
    username: String,
  },
  setup(props) {
    const store = useStore();
    const commitsInfo = ref(null);
    const nrOfBranches = ref(null);
    const curState = ref('');
    const targetLocation = ref('');
    /*const sortDocuments = (docs) => {
      docs.value.sort((a, b) => (a.type < b.type ? -1 : 1));
      store.commit('setRepoContents', docs.value);
    };*/
    const updateRepoContents = async (path) => {
      await store.dispatch('updateCurrentLocation', path);
      await updateDisplayAndSort(path);
    };
    const goToParentDirectory = () => {
      setTimeout(async () => {
        curState.value = currentLocationString.value;
        targetLocation.value = curState.value.lastIndexOf('/');
        store.dispatch('updateCurrentLocation', pathFromLocation.value);
        await updateDisplayAndSort(currentLocationString.value);
      }, 300);
    };
    const updateDisplayAndSort = async (path) => {
      store.dispatch('fetchRepoContentsAtLocation', {
        userName: props.username,
        repoName: props.reponame,
        location: encodeURIComponent(path),
      });
      //sortDocuments(docs);
    };
    const goToLocation = (path) => {
      curState.value = currentLocationString.value;
      targetLocation.value = curState.value.lastIndexOf(`/${path}`);
      store.dispatch('updateCurrentLocation', pathFromLocation.value);
      updateDisplayAndSort(currentLocationString.value);
    };
    /*const openModal = async (downloadUrl, name) => {
      const body = (await fetch(downloadUrl)).body;
      const readable = await body.getReader().read();
      const final = new TextDecode('utf-8').decode(readable.value);
      await store.dispatch('updateFileContent', final);
      await store.dispatch('updateFileName', name);
    }*/
    const handleClick = (doc) => {
      setTimeout(() => {
        if (doc.type === 'dir') updateRepoContents(doc.path);
        //if(doc.type === 'file') openModal(doc.download_url, doc.name);
      }, 300);
    };

    // TODO: finish converting methods to composition API
    //computed
    const docs = computed(() => store.getters.allRepoContents);
    const paths = computed(() => store.getters.getCurrentLocationAsArray);
    const currentLocationString = computed(
      () => store.getters.getCurrentLocationAsString
    );
    const getPathFromLocation = store.getters.getPathFromLocation;
       
  
    const commits = computed(() => store.getters.getCommits);
    const branches = computed(() => store.getters.getBranches);
    const pathFromLocation = computed(() =>
      getPathFromLocation(targetLocation.value)
    );

    //onMounted
    onMounted(async () => {
      await store.dispatch('fetchRepoContents', {
        userName: props.username,
        repoName: props.reponame,
      });
     //sortDocuments(docs);
      await store.dispatch('fetchCommits', {
        userName: props.username,
        repoName: props.reponame,
      });
      commitsInfo.value = commits.value.length;
      await store.dispatch('fetchBranches', {
        userName: props.username,
        repoName: props.reponame,
      });
      nrOfBranches.value = branches.value.length;
    });
    return {
      paths,
      nrOfBranches,
      goToLocation,
      commitsInfo,
      goToParentDirectory,
      currentLocationString,
      handleClick,
      docs,
    };
  },
};
</script>

<style scoped>
.repo-title {
  font-weight: bold;
}

.list {
  width: 100%;
  height: 65vh;
  overflow: auto;
  border-radius: 0;
}

.list-item {
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 100%;
  height: 100%;
}

.list-item-container {
  display: flex;
  align-items: center;
  border-top: 0;
}

.list-item-doc-title {
  padding: 5px;
}

.container {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-icon {
  height: 50%;
  width: 25px;
  color: black;
}

.list-container {
  width: 80%;
}

.bread {
  background-color: white;
  padding-left: 0;
}

/* Ripple effect */
.clickable {
  background-position: center;
  transition: background 0.8s;
  cursor: pointer;
}
.clickable:hover {
  background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
    center/15000%;
}
.clickable:active {
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
}
</style>
