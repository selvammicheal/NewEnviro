import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Description from './Description/Description';
import Comments from './Comments/Comments';
import Files from './Files/Files';
import History from './History/History';

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function RightSection(props) {
    const [value, setValue] = React.useState('Description');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCkEditorData = (data) => {
        props.ckeditorData(data)
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="black"
                indicatorColor="primary"
                aria-label="secondary tabs example"
            >
                <Tab value="Description" label="Description" />
                <Tab value="Comments" label="Comments" />
                <Tab value="Files" label="Files" />
                <Tab value="History" label="History" />
            </Tabs>
            <TabPanel value={value} index="Description">
                <Description handleCkEditorData={handleCkEditorData} />
            </TabPanel>
            <TabPanel value={value} index="Comments">
                <Comments />
            </TabPanel>
            <TabPanel value={value} index="Files">
                <Files />
            </TabPanel>
            <TabPanel value={value} index="History">
                <History />
            </TabPanel>
        </Box>
    );
}

export default RightSection;
