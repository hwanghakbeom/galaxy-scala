package galaxy.action

import xitrum.validator.Required

import scala.slick.session.Database.threadLocalSession
import scala.slick.driver.PostgresDriver.simple._

case class User(id: Option[Int], email: String, password: String)

object User extends Table[(Int, String, String)]("MEMBER") {
  def id = column[Int]("ID", O.PrimaryKey,O.AutoInc) // This is the primary key column
  def email = column[String]("NAME")
  def password = column[String]("ISADMIN")
  // Every table needs a * projection with the same type as the table's type parameter
  def * = id ~ email ~ password
  def noId = email ~ password
}