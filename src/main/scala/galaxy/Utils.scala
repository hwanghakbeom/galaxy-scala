package galaxy.action

import scala.slick.session.Database.threadLocalSession
import scala.slick.driver.PostgresDriver.simple._
import scala.slick.session.Database
import xitrum.{Action, SkipCsrfCheck}
import xitrum.annotation.GET
import xitrum.annotation.POST
import com.typesafe.config.ConfigFactory

trait Api extends Action with SkipCsrfCheck {
  override def layout = renderViewNoLayout[DefaultLayout]()
}

object DBSession {
  def getSession(): Database = {

  	    val cfg = ConfigFactory.load();


    var dbsession =  Database.forURL("jdbc:postgresql://ec2-54-204-37-92.compute-1.amazonaws.com:5432/dfvn5cost8sili", driver = "org.postgresql.Driver", user="keizylkgxxikkc", password="4Z-cjnXJ6fjbaIo8jAUGJnRwn0")
    dbsession.asInstanceOf[scala.slick.session.Database]

  }
}

@GET ("/setup")
class SetupDB extends Api {
  def execute() {
     DBSession.getSession().withSession{

            User.ddl.create
     }
     respondText("done")
    }
}