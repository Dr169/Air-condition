import { useState } from "react";

import PropTypes from "prop-types";
import { Box, Typography, Tabs, Tab } from "@mui/material";

import { UserInfo } from "./UserInfo";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "10px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "450px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="کل کاربران" {...a11yProps(0)} />
          <Tab label="کاربران حذف شده" {...a11yProps(1)} />
          <Tab label="کاربران غیر فعال" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        هیچ کاربر حذف شده‌ای وجود ندارد
      </TabPanel>
      <TabPanel value={value} index={2}>
        هیچ کاربر غیر فعالی وجود ندارد
      </TabPanel>
    </Box>
  );
};
