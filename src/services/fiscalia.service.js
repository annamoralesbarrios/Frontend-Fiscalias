import http from "../http-common";

class FiscaliaDataService {
  getAll() {
    return http.get("/fiscalias");
  }

  get(id) {
    return http.get(`/fiscalias/${id}`);
  }

  create(data) {
    return http.post("/fiscalias", data);
  }

  update(id, data) {
    return http.put(`/fiscalias/${id}`, data);
  }

  delete(id) {
    return http.delete(`/fiscalias/${id}`);
  }
}
//eslint-disable-next-line
export default new FiscaliaDataService();
