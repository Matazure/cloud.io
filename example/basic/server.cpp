#include <cloudio/server.hpp>

int main(){
    
    cloudio::io_service iosev;
    auto sp_server =  std::make_shared<cloudio::server>(iosev);
    sp_server->listen(4012);
    sp_server->of("/chat")->on_connection([](std::shared_ptr<cloudio::socket> sp_socket){
        sp_socket->on("test", [](const std::string &msg){
            std::cout << msg << std::endl;
        });
    });
    
    iosev.run();
    
    return 0;
}