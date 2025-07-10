import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";
import "@typespec/versioning";
import "./modules/login/controller.tsp";
import "./modules/user/controller.tsp";
import "./modules/role/controller.tsp";
import "./modules/reset-password/controller.tsp";
import "./modules/permission/controller.tsp";
import "./modules/logout/controller.tsp";
import "./modules/health/controller.tsp";
import "./modules/cat/controller.tsp";

using TypeSpec.Http;
using TypeSpec.OpenAPI;
using Utils.Versioning;
using TypeSpec.Versioning;

@service(#{            
  title: "Microservice API"
})

@server("http://localhost:4000/")
@versioned(DocVersionVersion)
namespace api;