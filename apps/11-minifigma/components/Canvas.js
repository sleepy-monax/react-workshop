import { useContext, useRef } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Animated, PanResponder, StyleSheet } from "react-native";
import { EntitiesContext, SelectedContext, ToolContext } from '../Contexts';
import { CursorTool } from '../Tools';



function Dragable({ pos, onDrag, children, }) {
    const pan = useRef(new Animated.ValueXY(pos)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ], {
                useNativeDriver: false
            }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
                onDrag({ x: pan.x._value, y: pan.y._value });
            }
        })
    ).current;

    return <Animated.View>
        <Animated.View
            style={{
                position: "absolute",
                transform: [{ translateX: pan.x }, { translateY: pan.y }]
            }}
            {...panResponder.panHandlers}
        >
            {children}
        </Animated.View>
    </Animated.View>
}

function RectEntity({ entity, update }) {
    return <View key={entity.id} style={{
        width: entity.width,
        height: entity.height,
        backgroundColor: entity.color,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cbd5e1'
    }} />
}

function TextEntity({ entity, update }) {
    return <Text key={entity.id} selectable={false} style={{
        width: entity.width,
        height: entity.height,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cbd5e1'
    }}>{entity.text}</Text>
}

function ImageEntity({ entity, update }) {
    return <Image key={entity.id} style={{
        width: entity.width,
        height: entity.height,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cbd5e1'
    }} source={{
        uri: entity.uri
    }} />
}

function Entity({ entity, update }) {
    const Inner = () => {
        switch (entity.type) {
            case "rect":
                return <RectEntity entity={entity} update={update} />

            case "text":
                return <TextEntity entity={entity} update={update} />

            case "image":
                return <ImageEntity entity={entity} update={update} />

            default:
                return null
        }
    }

    const [selected, updateSelected] = useContext(SelectedContext);


    return <Dragable
        pos={entity}
        onDrag={pos => {
            update({ ...entity, ...pos })
            updateSelected(entity.id)
        }} >
        <Inner />
    </Dragable>
}


export default function Canvas() {
    const [tool, updateTool] = useContext(ToolContext);
    const [entities, updateEntities] = useContext(EntitiesContext);


    if (tool.onCanvasPress === null) {
        return (
            <View style={{
                flexGrow: 1,
                backgroundColor: '#e2e8f0',
                overflow: 'hidden'
            }}>

                {entities.map(entity => {
                    function update(newEntity) {
                        updateEntities(entities.map(entity => {
                            if (entity.id === newEntity.id) {
                                return newEntity
                            }
                            return entity
                        }
                        ))
                    }

                    return (
                        <Entity key={entity.id} entity={entity} update={update} />
                    );
                })}
            </View>
        );
    } else {

        return (
            <TouchableWithoutFeedback
                style={{
                    flexGrow: 1,
                }}
                onPress={e => {
                    tool.onCanvasPress([entities, updateEntities], e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                    updateTool(CursorTool);
                }} >
                <View style={{
                    flexGrow: 1,
                    backgroundColor: '#e2e8f0',
                    overflow: 'hidden'
                }}>

                    {entities.map(entity => {
                        return (
                            <Entity key={entity.id} entity={entity} />
                        );
                    })}
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

