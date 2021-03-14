import { TestBed } from "@angular/core/testing";
import { WSService } from "./ws.service";
import { Socket } from "ngx-socket-io";
import { Character } from "app/interfaces/character.interface";

describe("WSService", () => {
  let service: WSService;

  let socket: Socket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Socket,
          useValue: {
            emit: jest.fn(),
            fromEvent: jest.fn(),
          },
        },
      ],
    });
    socket = TestBed.inject(Socket);
    service = TestBed.inject(WSService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("searchOpponent()", () => {
    it("should emit to socket user and fighter", () => {
      const spy = spyOn(socket, "emit");
      service.searchOpponent("1", {} as Character);
      expect(spy).toHaveBeenCalledWith("search-opponent", {
        userId: "1",
        fighter: {},
      });
    });
  });

  describe("searchingOpponent()", () => {
    it("should receive searching event", () => {
      const spy = spyOn(socket, "fromEvent");
      service.searchingOpponent();
      expect(spy).toHaveBeenCalledWith("searching");
    });
  });

  describe("connected()", () => {
    it("should receive connected event", () => {
      const spy = spyOn(socket, "fromEvent");
      service.connected();
      expect(spy).toHaveBeenCalledWith("connected");
    });
  });

  describe("disconnected()", () => {
    it("should receive disconnect event", () => {
      const spy = spyOn(socket, "fromEvent");
      service.disconnected();
      expect(spy).toHaveBeenCalledWith("disconnect");
    });
  });

  describe("opponentFound()", () => {
    it("should receive opponent-found event", () => {
      const spy = spyOn(socket, "fromEvent");
      service.opponentFound();
      expect(spy).toHaveBeenCalledWith("opponent-found");
    });
  });

  describe("turnResults()", () => {
    it("should receive turn-results event", () => {
      const spy = spyOn(socket, "fromEvent");
      service.turnResults();
      expect(spy).toHaveBeenCalledWith("turn-results");
    });
  });

  describe("end()", () => {
    it("should receive end event", () => {
      const spy = spyOn(socket, "fromEvent");
      service.end();
      expect(spy).toHaveBeenCalledWith("end");
    });
  });
});
