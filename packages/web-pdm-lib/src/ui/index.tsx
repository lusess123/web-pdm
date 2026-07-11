import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Check, ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from 'react';

type ElementProps = Record<string, any>;

type UiAdapterContextValue = {
  style: CSSProperties;
  theme: 'light' | 'dark';
  t: (key: string) => string;
};

const fallbackLabels: Record<string, string> = {
  'input.clear': 'Clear search',
  'tree.collapse': 'Collapse',
  'tree.expand': 'Expand',
  'tree.moreActions': 'More actions',
};

const UiAdapterContext = createContext<UiAdapterContextValue>({
  style: {},
  theme: 'light',
  t: (key) => fallbackLabels[key] ?? key,
});

const useAdapterUi = (value?: UiAdapterContextValue) => {
  const context = useContext(UiAdapterContext);
  return value ?? context;
};

export const Button = ({
  type: _type,
  size,
  className = '',
  ...props
}: ElementProps) => (
  <button
    className={`web-pdm-button web-pdm-button--${size ?? 'default'} ${className}`}
    type="button"
    {...props}
  />
);

export const Input = ({
  addonAfter,
  allowClear,
  size,
  className = '',
  webPdmUi,
  ...props
}: ElementProps) => {
  const { t } = useAdapterUi(webPdmUi);
  return (
    <div
      className={`web-pdm-input-group web-pdm-input-group--${size ?? 'default'} ${className}`}
    >
      <input className="web-pdm-input" {...props} />
      {allowClear && props.value ? (
        <button
          aria-label={t('input.clear')}
          className="web-pdm-input-clear"
          type="button"
          onClick={() => props.onChange?.({ target: { value: '' } })}
        >
          ×
        </button>
      ) : null}
      {addonAfter ? (
        <div className="web-pdm-input-addon">{addonAfter}</div>
      ) : null}
    </div>
  );
};

const SelectOption = (_props: ElementProps) => null;

export const Select = Object.assign(
  ({
    children,
    onChange,
    className = '',
    webPdmUi,
    ...props
  }: ElementProps) => {
    const ui = useAdapterUi(webPdmUi);
    const options = Children.toArray(children).filter(
      isValidElement,
    ) as React.ReactElement<ElementProps>[];
    return (
      <SelectPrimitive.Root
        value={props.value ?? props.defaultValue ?? ''}
        onValueChange={onChange}
      >
        <SelectPrimitive.Trigger className={`web-pdm-select ${className}`}>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <ChevronDown size={14} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="web-pdm-menu"
            data-web-pdm-theme={ui.theme}
            position="popper"
            style={ui.style}
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  className="web-pdm-menu-item"
                  key={option.key ?? option.props.value}
                  value={String(option.props.value)}
                >
                  <SelectPrimitive.ItemText>
                    {option.props.children}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check size={14} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
  { Option: SelectOption },
);

const MenuItem = ({ children }: ElementProps) => <>{children}</>;
export const Menu = Object.assign(
  ({ children }: ElementProps) => <>{children}</>,
  { Item: MenuItem },
);

export const Dropdown = ({
  children,
  overlay,
  className = '',
  webPdmUi,
}: ElementProps) => {
  const ui = useAdapterUi(webPdmUi);
  const trigger = children as React.ReactElement<ElementProps>;
  const items = Children.toArray(
    (overlay as React.ReactElement<ElementProps>)?.props?.children,
  ).filter(isValidElement) as React.ReactElement<ElementProps>[];
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild>
        {cloneElement(trigger, {
          className: [trigger.props.className, className]
            .filter(Boolean)
            .join(' '),
        })}
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          className="web-pdm-menu"
          data-web-pdm-theme={ui.theme}
          sideOffset={4}
          style={ui.style}
        >
          {items.map((item) => (
            <DropdownPrimitive.Item
              className="web-pdm-menu-item"
              key={item.key}
              onSelect={item.props.onClick}
            >
              {item.props.children}
            </DropdownPrimitive.Item>
          ))}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
};

export const Tooltip = ({ children, title, webPdmUi }: ElementProps) => {
  const ui = useAdapterUi(webPdmUi);
  const child = children as React.ReactElement<ElementProps>;
  const trigger = isValidElement<ElementProps>(child)
    ? cloneElement(child, {
        'aria-label': child.props['aria-label'] ?? title,
      })
    : children;
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="web-pdm-tooltip"
            data-web-pdm-theme={ui.theme}
            sideOffset={5}
            style={ui.style}
          >
            {title}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export const Popover = ({
  children,
  content,
  visible,
  onOpenChange,
  webPdmUi,
}: ElementProps) => {
  const ui = useAdapterUi(webPdmUi);
  return (
    <PopoverPrimitive.Root open={visible} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          className="web-pdm-popover"
          data-web-pdm-theme={ui.theme}
          side="right"
          sideOffset={6}
          style={ui.style}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

type TreeNodeProps = ElementProps & { eventKey?: React.Key };
const TreeNode = (_props: TreeNodeProps) => null;

const OptionBuilder = ({ data }: ElementProps) => {
  const { t } = useAdapterUi();
  return (
    <div className="tree-node-title">
      <span className="tree-node-title-title">{data.title}</span>
      {data.options?.length ? (
        <Dropdown
          overlay={
            <Menu>
              {data.options.map((option: ElementProps) => (
                <Menu.Item key={option.key} onClick={option.click}>
                  {option.title}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <button
            aria-label={t('tree.moreActions')}
            className="tree-node-title-options"
            type="button"
            onClick={(event) => event.stopPropagation()}
          >
            <MoreHorizontal size={15} />
          </button>
        </Dropdown>
      ) : null}
    </div>
  );
};

const getNodeKey = (node: React.ReactElement<TreeNodeProps>) =>
  String(node.props.eventKey ?? node.key ?? '').replace(/^\.\$/, '');

const getLeafKeys = (nodes: React.ReactNode): string[] =>
  Children.toArray(nodes)
    .filter(isValidElement)
    .flatMap((rawNode) => {
      const node = rawNode as React.ReactElement<TreeNodeProps>;
      return Children.count(node.props.children) > 0
        ? getLeafKeys(node.props.children)
        : [getNodeKey(node)];
    });

const TreeCheckbox = ({ checked, indeterminate, onChange }: ElementProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      className="web-pdm-tree-checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

const TreeView = ({
  children,
  selectedKeys = [],
  checkedKeys = [],
  expandedKeys = [],
  onSelect,
  onCheck,
  onExpand,
  checkable,
  className = '',
  webPdmUi,
}: ElementProps) => {
  const ui = useAdapterUi(webPdmUi);
  const { t } = ui;
  const selected = useMemo(
    () => new Set(selectedKeys.map(String)),
    [selectedKeys],
  );
  const checked = useMemo(
    () => new Set(checkedKeys.map(String)),
    [checkedKeys],
  );
  const expanded = useMemo(
    () => new Set(expandedKeys.map(String)),
    [expandedKeys],
  );

  const renderNodes = (nodes: React.ReactNode, level = 0): React.ReactNode =>
    Children.toArray(nodes)
      .filter(isValidElement)
      .map((rawNode) => {
        const node = rawNode as React.ReactElement<TreeNodeProps>;
        const key = getNodeKey(node);
        const childNodes = node.props.children;
        const hasChildren = Children.count(childNodes) > 0;
        const isExpanded = expanded.has(key);
        const checkKeys = hasChildren ? getLeafKeys(childNodes) : [key];
        const isChecked =
          checkKeys.length > 0 && checkKeys.every((id) => checked.has(id));
        const isIndeterminate =
          !isChecked && checkKeys.some((id) => checked.has(id));
        return (
          <div className="web-pdm-tree-node" key={key}>
            <div
              className={`web-pdm-tree-row ${hasChildren ? 'is-branch' : 'is-leaf'} ${selected.has(key) ? 'is-selected' : ''}`}
              style={{ paddingLeft: level * 12 }}
            >
              {hasChildren ? (
                <button
                  className="web-pdm-tree-toggle"
                  type="button"
                  aria-label={t(isExpanded ? 'tree.collapse' : 'tree.expand')}
                  onClick={() =>
                    onExpand?.(
                      isExpanded
                        ? [...expanded].filter((id) => id !== key)
                        : [...expanded, key],
                    )
                  }
                >
                  {isExpanded ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
              ) : (
                <span
                  className="web-pdm-tree-toggle-spacer"
                  aria-hidden="true"
                />
              )}
              {checkable ? (
                <TreeCheckbox
                  checked={isChecked}
                  indeterminate={isIndeterminate}
                  onChange={() =>
                    onCheck?.([
                      ...new Set(
                        isChecked
                          ? [...checked].filter((id) => !checkKeys.includes(id))
                          : [...checked, ...checkKeys],
                      ),
                    ])
                  }
                />
              ) : null}
              <div
                className="web-pdm-tree-label"
                role="button"
                tabIndex={0}
                onClick={() => onSelect?.([key])}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect?.([key]);
                  }
                }}
              >
                {node.props.title}
              </div>
            </div>
            {hasChildren && isExpanded
              ? renderNodes(childNodes, level + 1)
              : null}
          </div>
        );
      });

  return (
    <UiAdapterContext.Provider value={ui}>
      <div className={`web-pdm-tree ${className}`} role="tree">
        {renderNodes(children)}
      </div>
    </UiAdapterContext.Provider>
  );
};

export const Tree: any = Object.assign(TreeView, { TreeNode, OptionBuilder });
