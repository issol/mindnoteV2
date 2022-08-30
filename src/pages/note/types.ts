export type SelectedNodeType = {
  nodes: [number];
  edges: [number];
};

export type EdgeDataType = {
  id: string;
  from: string;
  to: string;
  label: string;
};

export type NoteFormType = {
  id: string;
  label: string;
  createdAt: string;
};

export type ConnectionFormType = {
  id: string;
  reason: string;
  from: string;
  to: string;
};

export type GraphType = {
  nodes: [{ id: string; label: string; createdAt: string }];
  edges: [{ id: string; from: string; to: string; reason: string }];
};

export type ManiPulationType = {
  enabled: boolean;
  initiallyActive: boolean;

  addEdge: (edgeData: EdgeDataType, _callback: any) => void;
  editEdge: (edgeData: EdgeDataType, _callback: any) => void;
  deleteEdge: (edgeData: SelectedNodeType, _callback: any) => void;
};

export type EventType = {
  doubleClick: (event: any) => void;
  selectNode: (event: any) => void;
  deselectNode: () => void;
};

export type PieceType = {
  createdAt: number;
  creatorId: string;
  desc: string;

  nodes: [{ id: string; label: string; createdAt: string }];
  edges: [{ id: string; from: string; to: string; reason: string }];
  article: {
    id: string;
    title: string;
    desc?: string;
    content: string;
    isFirst: boolean;
  };

  id: string;
  title: string;
  updatedAt: number;
};

export type ContextMenuProps = {
  top: number;
  left: number;
};

export type ArticleInfoType = {
  id: string;
  title: string;
  desc?: string;
  content: string;
  isFirst: boolean;
};

export const graphDefaultVisualOptions = {
  autoResize: true,
  height: '800px',
  width: '100%',
  layout: {
    randomSeed: 1,
  },

  physics: {
    enabled: true,
    barnesHut: {
      centralGravity: 0,
      gravitationalConstant: -1000,
      springConstant: 0.0,
      avoidOverlap: 0,
    },
  },

  interaction: {
    zoomView: false,
    navigationButtons: true,
  },

  edges: {
    arrows: {
      to: {
        enabled: true,
      },
      from: {
        enabled: false,
      },
    },

    width: 1.5,
    color: {
      color: '#D3D3D3',
      highlight: '#797979',
      hover: '#797979',
      opacity: 1.0,
    },
  },

  nodes: {
    fixed: {
      x: false,
      y: false,
    },
    widthConstraint: {
      minimum: 100,
      maximum: 150,
    },
    heightConstraint: {
      minimum: 50,
    },

    shape: 'box',
    size: 10,
    borderWidth: 0.5,
    borderWidthSelected: 2,
    font: {
      color: '#adaeb9',
      size: 15,
      align: 'center',
      bold: {
        color: '#bbbdc0',
        size: 15,
        vadjust: 0,
        mod: 'bold',
      },
    },
    color: {
      background: 'white',
      border: 'black',
    },
  },
};
