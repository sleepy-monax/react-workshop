import { useState } from 'react'
import { View } from 'react-native';
import Canvas from './components/Canvas';
import Properties from './components/Properties';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { ToolContext, EntitiesContext, SelectedContext } from './Contexts';
import { CursorTool } from './Tools';


export default function App() {
  const [tool, updateTool] = useState(CursorTool);
  const [entities, updateEntities] = useState([]);
  const [selected, updateSelected] = useState(-1);

  return (
    <ToolContext.Provider value={[tool, updateTool]}>
      <EntitiesContext.Provider value={[entities, updateEntities]}>
        <SelectedContext.Provider value={[selected, updateSelected]}>
          <View style={{ flex: 1 }}>
            <Toolbar />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Sidebar />
              <Canvas />
              <Properties />
            </View>
          </View>
        </SelectedContext.Provider>
      </EntitiesContext.Provider>
    </ToolContext.Provider>
  );
}

