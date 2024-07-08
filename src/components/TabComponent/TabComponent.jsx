import React, { useState } from 'react';
import './TabComponent.css';

const TabComponent = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {props.children.map((child) => {
          const { label } = child.props;

          return (
            <li
              className={label === activeTab ? 'tab-list-item tab-list-active' : 'tab-list-item'}
              key={label}
              onClick={() => onClickTabItem(label)}
            >
              {label}
            </li>
          );
        })}
      </ol>
      <div className="tab-content">
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default TabComponent;
