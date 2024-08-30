export function toTitleCase(fullName) {
    if(fullName){
    return fullName
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  else{
    return "* No Name *";
  }
}