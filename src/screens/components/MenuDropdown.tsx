import {Button, Menu} from "react-native-paper";
import {useState} from "react";

type Option = { label: string; value: string };

interface MenuDropdownProps {
  options: Option[];
  selected: string | undefined;
  onSelect: (val: string) => void;
  placeholder: string;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
                                                            options, selected, onSelect, placeholder
                                                          }) => {
  const [visible, setVisible] = useState(false);

  return (
      <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setVisible(true)}>
              {selected
                  ? options.find(o => o.value === selected)?.label
                  : placeholder}
            </Button>
          }
      >
        {options.map(opt => (
            <Menu.Item
                key={opt.value}
                title={opt.label}
                onPress={() => {
                  onSelect(opt.value);
                  setVisible(false);
                }}
            />
        ))}
      </Menu>
  );
};
