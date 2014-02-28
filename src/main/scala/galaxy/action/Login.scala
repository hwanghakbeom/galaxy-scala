package galaxy.action

import scala.slick.driver.PostgresDriver.simple._
import scala.slick.session.Database.threadLocalSession
import xitrum.{Action, Server,SkipCsrfCheck}
import xitrum.annotation._
import xitrum.RequestVar
import xitrum.validator.Required


@POST("login")
class Login extends Api {
  def execute() {
  	session.clear()
    val email   = param("email")
    val password = param("password")
    //verification
    DBSession.getSession().withSession{

    }
    respondText(email + password)
  }
}

@GET ("/setup")
class default extends Api {
  def execute() {
     DBSession.getSession().withSession{

            User.ddl.create
     }
     respondText("done")
    }
}
