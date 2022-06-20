import { useContext } from 'react'
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableHighlight } from 'react-native-web';
import { ToolContext } from "../Contexts";
import { tools } from '../Tools';

const toolStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#cbd5e1'
    },
    default: {
        width: 36, height: 36, justifyContent: "center",
    },
    active: {
        backgroundColor: '#bfdbfe'
    },
    inactive: {
        backgroundColor: '#f8fafc'
    }
});


function Tool({ tool, icon }) {
    const [selectedTool, updateSelectedTool] = useContext(ToolContext);

    const currentStyle = [
        toolStyles.default,
        (selectedTool.type === tool.type ? toolStyles.active : toolStyles.inactive),
    ];


    return (
        <TouchableHighlight onPress={() => updateSelectedTool(tool)}>
            <View style={StyleSheet.flatten(currentStyle)} >
                <Icon style={{ alignSelf: "center" }} name={icon} size={24} color="#000" />
            </View>
        </TouchableHighlight>
    );
}


export default function Toolbar() {
    return (
        <View style={toolStyles.container}>
            {tools.map(tool => (
                <Tool key={tool.type} tool={tool} icon={tool.icon} />
            ))}
        </View >
    );
}
