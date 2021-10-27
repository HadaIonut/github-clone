 


const searchUsers = async () => {
  try {
    // const items =  await fetch('api.github.com/search/users?q=majeri')
    // await $store.dispatch('getUserListAction', {queryParams: {...params}})
    
    // console.log(items)
    // return items
  } catch (error) {
    // makeErrorToast(
    //   params?.context,
    //   error.message || `Unable to search for users like '${params?.q}'`
    // );
  console.log(error)
  }

};

export { searchUsers };
