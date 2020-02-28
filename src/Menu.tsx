import React, { FC } from 'react';
import Cross from './icons/Cross';
import { buildTreeDataFromClocData, ClocMap, TreeNode } from './buildTreeData';

type Props = {
  showMenu: boolean;
  uploadFile: (parsedData: ClocMap) => void;
  toggleMenu: () => void;
};

const Li = (props: any) => (
  <li
    className="py-3 px-5 border-b border-gray-300 hover:bg-gray-200"
    {...props}
  />
);

const Menu: FC<Props> = ({ showMenu, uploadFile, toggleMenu }) => {
  const onFileChange = (e: any) => {
    e.target.files[0].text().then((text: string) => {
      uploadFile(JSON.parse(text));
      toggleMenu();
    });
  };

  if (!showMenu) return null;

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-fade" />
      <div className="fixed top-0 bottom-0 left-0 shadow-2xl bg-white border-r border-gray-300">
        <header className="flex justify-between border-b border-gray-300">
          <h2 className="text-xl m-4">Options</h2>
          <button className="mr-2" title="Close" onClick={toggleMenu}>
            <Cross />
          </button>
        </header>
        <ul>
          <Li>
            <label className="block cursor-pointer">
              Upload cloc JSON, generated like:
              <div className="font-mono">
                cloc --exclude-dir node_modules --by-file --json . > cloc.json
              </div>
              <input
                className="block py-3 px-5 cursor-pointer"
                type="file"
                multiple={false}
                accept="application/json"
                onChange={onFileChange}
              />
            </label>
          </Li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
