package galaxy

import scala.util.Properties

import xitrum.{Action, Server,SkipCsrfCheck}
import xitrum.annotation._
import xitrum.RequestVar
import xitrum.validator.Required
// import placeholder.model._

//-----------------------------------------------------------------------------
// Future version

import scala.concurrent.{Future, ExecutionContext}
import xitrum.annotation.CacheActionDay



object Boot {
  def main(args: Array[String]) {
    Server.start()
  }
}
