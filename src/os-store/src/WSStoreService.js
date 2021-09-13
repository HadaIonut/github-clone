import get from 'lodash/get';

const WS_SUBSCRIPTIONS = Symbol('websocket_subscriptions');

class WSStoreService {
  constructor({ $store, WSConnection }) {
    this.$store = $store;
    this.WSConnection = WSConnection;
    this[WS_SUBSCRIPTIONS] = {};

    this.created();
  }

  // Handled events are registered to avoid triggering mutations which do not exist
  registerWSStoreSubscriptions = () => {
    // eslint-disable-next-line
    Object.values(this.$store._modules.root.state).forEach(module => {
      const WSSubscriptions = module[WS_SUBSCRIPTIONS] || [];

      WSSubscriptions.forEach(
        ({ group, action, serializer, customActions, customMutations }) => {
          if (!this[WS_SUBSCRIPTIONS][group]) {
            this[WS_SUBSCRIPTIONS][group] = {};
          }

          this[WS_SUBSCRIPTIONS][group] = {
            ...this[WS_SUBSCRIPTIONS][group],
            [action]: {
              action,
              serializer,
              customActions,
              customMutations,
            },
          };
        }
      );
    });
  };

  commitStoreAction = data => {
    if (this.$store) {
      const { group, action, content } = data;

      if (get(this[WS_SUBSCRIPTIONS], [group, action])) {
        const {
          customActions = [],
          customMutations = [],
          serializer = values => values,
        } = get(this[WS_SUBSCRIPTIONS], [group, action]);

        const serializedContent = serializer(content);

        this.$store.commit(`${group}/${action}`, {
          data: serializedContent,
        });

        customMutations.forEach(name => {
          // Calls a mutation from any store module
          // customMutations should look like this:
          // ['module/mutationName']
          if (name.indexOf('/') > 0) {
            this.$store.commit(name, serializedContent, { root: true });
          } else {
            this.$store.commit(name, serializedContent);
          }
        });

        customActions.forEach(name => {
          // Calls an action from any store module
          // customActions should look like this:
          // ['module/actionName']
          if (name.indexOf('/') > 0) {
            this.$store.dispatch(name, serializedContent, { root: true });
          } else {
            this.$store.dispatch(`${group}/${name}`, serializedContent, {
              root: true,
            });
          }
        });
      }
    }
  };

  connectToSocket = () => {
    this.WSConnection.on('message', this.commitStoreAction);
    this.WSConnection.on('close', this.updateStoreWSStatus);
    this.WSConnection.on('error', this.updateStoreWSStatus);
    this.WSConnection.on('open', this.connectToSocket);

    this.updateStoreWSStatus();
  };

  updateStoreWSStatus = () => {
    this.$store.commit('ws/statusUpdate', {
      status: this.WSConnection.isConnected,
    });

    if (!this.WSConnection.isConnected) {
      this.$store.commit('auth/updateWSAuth', false);
    }
  };

  subscribeStoreToWS = () => {
    this.$store.registerModule('ws', {
      state: {
        isWSConnected: false,
      },
      mutations: {
        socketEmit: (state, payload) => {
          this.WSConnection.sendMessage({ ...payload });
        },
        statusUpdate: (state, { status }) => {
          state.isWSConnected = status;
        },
      },
      namespaced: true,
    });
  };

  created = () => {
    this.WSConnection.subscribeToWSConnection(this.connectToSocket);
    this.subscribeStoreToWS();
    this.registerWSStoreSubscriptions();
    this.connectToSocket();
  };
}

const createWSPlugin = ({ WSConnection }) => {
  return $store => new WSStoreService({ $store, WSConnection });
};

export { WS_SUBSCRIPTIONS, createWSPlugin };
