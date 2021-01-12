import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import { Typography } from "@material-ui/core";

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number)
    }
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() * 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0
    }
  },
  input: {
    padding: "0 !important"
  },
  inputRoot: {
    padding: `0px 0px 0px ${theme.spacing(2)}px !important`,
    height: "25px"
  }
}));

export interface ComboboxOption {
  name: string;
  value: any;
}

interface Props {
  disabled?: boolean;
  isFullWidth?: boolean;
  options?: ComboboxOption[];
  onChange: (event: any, value: ComboboxOption | null) => void;
  selectedOption: ComboboxOption | null;
  name?: string;
}

const VirtualAutoComplete = ({
  disabled,
  isFullWidth,
  options,
  onChange,
  selectedOption,
  name
}: Props) => {
  const classes = useStyles();

  return (
    <Autocomplete
      onChange={onChange}
      fullWidth={isFullWidth}
      disabled={disabled}
      value={selectedOption}
      disableListWrap
      classes={{ inputRoot: classes.inputRoot, input: classes.input, listbox: classes.listbox }}
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      options={options ?? []}
      getOptionLabel={option => option.name}
      renderInput={(params) => <TextField {...params} variant="outlined"/>}
      renderOption={(option) => <Typography noWrap>{option.name}</Typography>}
    />
  );
};

export default React.memo(VirtualAutoComplete);
