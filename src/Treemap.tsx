import React, { FC } from 'react';
import { TreeNode } from './buildTreeData';
import layoutRects, { Rect } from './layerOuterer';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  treeData: TreeNode;
  depth: number;
};

const paddingX = 10;
const paddingY = 20;
const textHeight = 12;
const colourClasses = [
  'text-red-400 hover:text-red-600',
  'text-orange-400 hover:text-orange-600',
  'text-yellow-400 hover:text-yellow-600',
  'text-green-400 hover:text-green-600',
  'text-blue-400 hover:text-blue-600',
  'text-purple-400 hover:text-purple-600',
  'text-pink-400 hover:text-pink-600',
];

const Treemap: FC<Props> = ({ x, y, width, height, treeData, depth }) => {
  const colour = colourClasses[depth % colourClasses.length];

  const childSizes = (treeData.children || []).map(child => child.size);
  const childRects = layoutRects(
    width,
    height,
    treeData.size,
    childSizes,
    paddingX,
    paddingY,
  );

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        className={`stroke-black fill-current ${colour}`}
      />
      <text textAnchor="middle" x={x + width / 2} y={y + textHeight + 3}>
        {treeData.name}
      </text>
      {treeData.children &&
        treeData.children.map((child, index) => {
          const rect: Rect = childRects[index];
          return (
            <Treemap
              key={index}
              x={x + rect.x}
              y={y + rect.y}
              width={rect.width}
              height={rect.height}
              treeData={child}
              depth={depth + 1}
            />
          );
        })}
    </>
  );
};

export default Treemap;