import React, { useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';

import { updateRole } from '../../../utils/caslAbility';
import CaslContext from '../../../utils/caslContext';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import Can from '../../../services/casl';

import Button from '../../../components/Common/buttons/SecondaryButton';
import Card from '../../../components/Common/Card';

const Permissions = () => {
  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [isClient, setClient] = useState(false);
  const [privateData, setPrivateData] = useState();
  const [privateJWTData, setPrivateJWTData] = useState();
  const [isAdmin, setAdmin] = useState(true);

  /* eslint-disable */
  //meant to address React hydration issue
  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    updateRole(ability, 'admin');
  }, []);
  /* eslint-enable */

  const apiPermission = async () => {
    fetchInit();

    //api for permission routes
    let role = isAdmin ? 'admin' : 'user';

    let data = { role };

    //for permission api requests
    let result = await axios.post('/private/permissions', data).catch((err) => {
      fetchFailure(err);
    });

    setPrivateData(result.data);

    fetchSuccess();
  };

  const apiJWTAuth = async () => {
    let token = authState.user.jwt_token;
    const headers = { Authorization: `Bearer ${token}` };
    const params = { key: 'value' };
    let result = await axios.get('/private/auth', { headers, params }).catch((err) => {
      fetchFailure(err);
    });

    setPrivateJWTData(result.data);

    //for post or put requests, headers go after body data
    //const data = { data: 'data' };
    //let result = await axios.post('/private/auth', data, { headers }).catch((err) => {
    //  fetchFailure(err);
    //});
    //setPrivateJWTData(result.data);
  };

  const roleHandler = () => {
    if (isAdmin) {
      setAdmin(false);
      updateRole(ability, 'user');
    } else {
      setAdmin(true);
      updateRole(ability, 'admin');
    }
  };

  return (
    <div>
      {isClient && (
        <div>
          <Card>
            <h2>Your Current Role is:</h2>
            {isAdmin ? <p>Admin</p> : <p>User</p>}
            <div>Click Below to Change Current Role:</div>
            <Button onClick={roleHandler}> Change </Button>
          </Card>
          <Card>
            <Can I="read" a="admin post">
              <p>Only Admin can see Text</p>
            </Can>
            <Can I="read" a="post">
              <p>User and Admin can see Text</p>
            </Can>
            <p>Render Button but make it disabled for non-admins</p>
            <Can I="create" a="Post" passThrough>
              {(allowed) => <Button disabled={!allowed}>Save</Button>}
            </Can>
          </Card>
          <Card>
            <p>The optional third prop "field" allows for more fine grained control</p>
            <Can I="read" a="article" field="title">
              <div>Title</div>
            </Can>
            <Can I="read" a="article" field="description">
              <div>Description</div>
            </Can>
            <Can I="read" a="article" field="admin">
              <div>User can't see this field</div>
            </Can>
          </Card>

          <Card>
            <div>
              Admin has all permissions by default, but can be explicitly denied certain permissions
            </div>
            <div>User can see, but admin cant see the below element</div>
            <Can I="read" a="user" field="password">
              <div>UserPassWord123</div>
            </Can>
          </Card>
          <Card>
            <Spin tip="Loading..." spinning={isLoading}>
              <div>Permissions Also Need to be Setup Server Side</div>
              <div>Click below to make an api request with permissions check.</div>
              <div>API request will pass for Admin but fail for user.</div>
              <Button onClick={apiPermission}>Submit</Button>
              <p>{privateData}</p>
            </Spin>
          </Card>
          <Card>
            <Spin tip="Loading..." spinning={isLoading}>
              <div>
                Api requests with JWT tokens can also be made together or seperately from
                permissions. see server/src/API/utils.js for an example
              </div>
              <Button onClick={apiJWTAuth}>Submit</Button>
              <p>{privateJWTData}</p>
            </Spin>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Permissions;
