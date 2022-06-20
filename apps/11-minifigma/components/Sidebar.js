import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { EntitiesContext, SelectedContext } from "../Contexts";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableHighlight } from "react-native-web";


let styles = StyleSheet.create({
    container: {
        width: 256,
        backgroundColor: '#f8fafc',
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderColor: '#cbd5e1'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: '#0f172a'
    },
    item: {
        flexDirection: "row",
        backgroundColor: '#f8fafc',
        alignItems: "center",
        padding: 4,
        paddingStart: 10,
        color: '#0f172a'
    },
    selectedItem: {
        backgroundColor: '#bfdbfe'
    },
    itemIcon: {
        paddingRight: 10,
    },
    itemText: {
        fontSize: 16,
        color: '#0f172a'
    }
});

function Entity({ entity }) {
    const [selected, updateSelected] = useContext(SelectedContext);
    const { id, type } = entity;
    const icon = {
        rect: 'vector-square',
        text: 'format-color-text',
        image: 'image'
    }[type];
    return (
        <TouchableHighlight onPress={() => { updateSelected(entity.id) }}>
            <View style={StyleSheet.compose(styles.item, (selected == id) ? styles.selectedItem : null)}>
                <Icon style={styles.itemIcon} name={icon} size={24} color="#000" />
                <Text style={styles.itemText}>{type}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default function Sidebar() {
    const [entities, updateEntities] = useContext(EntitiesContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sidebar</Text>
            {entities.map(entity => <Entity key={entity.id} entity={entity} update={updateEntities} />)}
        </View>
    );
}
