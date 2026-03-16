const navIcon = (props) => {
  let navIcons = false;
  if (props.items.icon) {
    navIcons = props.items.icon();
  }
  return navIcons;
};

export default navIcon;
