import { useContext } from "react";
import { EntitiesContext, SelectedContext } from "../Contexts";

import { View, Text, StyleSheet } from "react-native";

let styles = StyleSheet.create({
    container: {
        width: 256,
        backgroundColor: '#f8fafc',
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderColor: '#cbd5e1'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: '#0f172a'
    }
});

function extractProperties(entity, update) {
    return Object.keys(entity).filter(key => key !== 'type' && key !== 'id').map(key => {
        return {
            key,
            value: entity[key]
        };
    }
    );
}

export default function Properties() {
    const [selected, updateSelected] = useContext(SelectedContext);
    const [entities, updateEntities] = useContext(EntitiesContext);

    if (selected === -1) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Properties</Text>
                <Text>Please select an entity</Text>
            </View>
        );
    } else {
        let entity = entities.find(entity => entity.id === selected);

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Properties</Text>
                {extractProperties(entity, updateEntities).map(property => {
                    return (
                        <Text key={property.key}>{property.key}: {property.value}</Text>
                    );
                }
                )}
            </View>
        );
    }
}
