import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Grid from "@mui/material/Grid";

interface IconItem {
  name: string;
  icon: JSX.Element;
}

interface IconSelectionProps {
  icons: IconItem[];
  onSelectIcon: (selectedIconName: string) => void;
}

const IconSelection: React.FC<IconSelectionProps> = ({
  icons,
  onSelectIcon,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleListItemClick = (iconName: string): void => {
    setSelectedIcon(iconName);
    onSelectIcon(iconName);
    setOpen(false);
  };

  const renderIcon = (): React.JSX.Element => {
    const foundIcon = icons.find((icon) => icon.name === selectedIcon);
    return foundIcon != null ? foundIcon.icon : <span>Select Icon</span>;
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        color="primary"
        aria-label="select icon"
        style={{
          backgroundColor: "ghostwhite",
          border: "1px solid gray",
          height: "8rem",
          width: "8rem",
        }}
      >
        {renderIcon()}
      </IconButton>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>Select an Icon</DialogTitle>
        <List>
          <Grid container spacing={2}>
            {icons.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
                <ListItem
                  onClick={() => {
                    handleListItemClick(item.name);
                  }}
                  style={{ display: "block" }}
                >
                  <ListItemIcon
                    sx={{
                      marginLeft: ".8rem",
                      "&:hover": {
                        cursor: "pointer",
                        background: "#eee",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </List>
      </Dialog>
    </div>
  );
};

export default IconSelection;
