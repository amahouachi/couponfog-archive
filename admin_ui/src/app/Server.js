
export const Server= {
  url: null,
  key: null,
  initialize: ({url,key}) => {
    Server.url= url;
    Server.key= key;
  },
  getCouponsByStatus: async (status) => {
    const url= Server.url + '/admin/api/coupons?status=' + status + "&key="+Server.key;
    const response = await fetch(url);
    return await response.json();
  },
  postCoupon: async (coupon) => {
    const url= Server.url + '/admin/api/coupons?key='+Server.key;
    return await fetch(url,{
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coupon),
    });
  },
  publishCoupons: async (store,couponIds, notify) => {
    const url= Server.url + '/admin/api/publish-coupons?key='+Server.key;
    return await fetch(url,{
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({store, couponIds, notify}),
    });
  },
  updateExtension: async (store,extension) => {
    const url= Server.url + '/admin/api/stores/'+store.id+'/extension?key='+Server.key;
    return await fetch(url,{
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({store, extension}),
    });
  },
  updateCache: async (store) => {
    const url= Server.url + '/admin/api/stores/'+store.id+'/update-cache?key='+Server.key;
    return await fetch(url,{
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    });
  },
  getProviders: async() => {
    const url= Server.url + '/admin/api/providers?key='+Server.key;
    const response = await fetch(url);
    return await response.json();
  },
  getStores: async () => {
    const url= Server.url + '/admin/api/stores?key='+Server.key;
    const response = await fetch(url);
    return await response.json();
  },
  getStore: async (id) => {
    const url= Server.url + '/admin/api/stores/'+id+'?key='+Server.key;
    const response = await fetch(url);
    return await response.json();
  },

}